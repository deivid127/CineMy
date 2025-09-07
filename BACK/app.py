from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import json
from datetime import date, datetime

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        return super().default(obj)

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder
CORS(app)

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="cinemy"
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Erro de conexão com o banco de dados: {err}")
        return None

# --- ROTAS DE FILMES (sem alterações) ---
@app.route('/filmes/lancamentos', methods=['GET'])
def get_lancamentos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM filmes ORDER BY ano DESC, id_filme DESC LIMIT 5")
    filmes = cursor.fetchall()
    conn.close()
    return jsonify(filmes)

@app.route('/filmes/populares', methods=['GET'])
def get_populares():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM filmes ORDER BY avaliacao DESC LIMIT 5")
    filmes = cursor.fetchall()
    conn.close()
    return jsonify(filmes)

@app.route('/filmes/series', methods=['GET'])
def get_series():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM filmes ORDER BY RAND() LIMIT 5")
    filmes = cursor.fetchall()
    conn.close()
    return jsonify(filmes)

@app.route('/filmes/<int:id_filme>', methods=['GET'])
def get_filme_by_id(id_filme):
    conn = get_db_connection()
    if conn is None: return jsonify({"erro": "Não foi possível conectar ao banco de dados"}), 500
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM filmes WHERE id_filme = %s", (id_filme,))
    filme = cursor.fetchone()
    conn.close()
    if filme is None: return jsonify({"erro": "Filme não encontrado"}), 404
    return jsonify(filme)

@app.route('/search/filmes', methods=['GET'])
def search_filmes():
    query = request.args.get('q', '')
    if len(query) < 2: return jsonify([])
    conn = get_db_connection()
    if conn is None: return jsonify({"erro": "Não foi possível conectar ao banco de dados"}), 500
    cursor = conn.cursor(dictionary=True)
    search_query = f"%{query}%"
    cursor.execute("SELECT id_filme, titulo, imagem FROM filmes WHERE titulo LIKE %s LIMIT 5", (search_query,))
    results = cursor.fetchall()
    conn.close()
    return jsonify(results)

# --- ROTA DE LOGIN (sem alterações) ---
@app.route('/login', methods=['POST'])
def handle_login():
    dados = request.get_json()
    if not dados or 'email' not in dados or 'senha' not in dados:
        return jsonify({"sucesso": False, "mensagem": "Email e senha são obrigatórios."}), 400
    email = dados['email']
    senha = dados['senha']
    conn = get_db_connection()
    if conn is None: return jsonify({"sucesso": False, "mensagem": "Erro de conexão com o banco de dados."}), 500
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id_usuario, nome_usuario FROM usuarios WHERE email = %s AND senha = %s", (email, senha))
    usuario = cursor.fetchone()
    cursor.close()
    conn.close()
    if usuario:
        return jsonify({"sucesso": True, "mensagem": f"Bem-vindo, {usuario['nome_usuario']}!", "usuario": usuario})
    else:
        return jsonify({"sucesso": False, "mensagem": "Email ou senha inválidos."}), 401


# ====================================================================
# ✅ NOVA ROTA PARA REGISTAR NOVOS UTILIZADORES
# ====================================================================
@app.route('/registrar', methods=['POST'])
def handle_register():
    dados = request.get_json()
    if not dados or 'username' not in dados or 'email' not in dados or 'password' not in dados:
        return jsonify({"sucesso": False, "mensagem": "Todos os campos são obrigatórios."}), 400

    nome_usuario = dados['username']
    email = dados['email']
    senha = dados['password']

    conn = get_db_connection()
    if conn is None:
        return jsonify({"sucesso": False, "mensagem": "Erro de conexão com o banco de dados."}), 500

    cursor = conn.cursor()
    # Inserir o novo utilizador
    query = "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (%s, %s, %s)"
    try:
        cursor.execute(query, (nome_usuario, email, senha))
        conn.commit()
        return jsonify({"sucesso": True, "mensagem": "Conta criada com sucesso! Agora pode fazer o login."}), 201
    except mysql.connector.Error as err:
        conn.rollback()
        # Código de erro 1062 é para entradas duplicadas (UNIQUE constraint)
        if err.errno == 1062:
            return jsonify({"sucesso": False, "mensagem": "Este nome de utilizador ou email já existe."}), 409
        else:
            return jsonify({"sucesso": False, "mensagem": f"Erro no banco de dados: {err}"}), 500
    finally:
        cursor.close()
        conn.close()
        
# --- ROTAS DE COMENTÁRIOS CORRIGIDAS ---

@app.route('/filmes/<int:id_filme>/comentarios', methods=['GET'])
def get_comentarios(id_filme):
    conn = get_db_connection()
    if conn is None: return jsonify({"erro": "Não foi possível conectar ao banco de dados"}), 500
    cursor = conn.cursor(dictionary=True)
    query = """
        SELECT c.id_comentario, c.conteudo, c.data_criacao,
               COALESCE(u.nome_usuario, 'Anônimo') AS nome_usuario
        FROM comentarios c
        LEFT JOIN usuarios u ON c.id_usuario = u.id_usuario
        WHERE c.id_filme = %s
        ORDER BY c.data_criacao DESC
    """
    cursor.execute(query, (id_filme,))
    comentarios = cursor.fetchall()
    conn.close()
    return jsonify(comentarios)


# ✅ ROTA CORRIGIDA PARA ADICIONAR COMENTÁRIOS
@app.route('/filmes/<int:id_filme>/comentarios/add', methods=['POST'])
def add_comentario(id_filme):
    dados = request.get_json()
    print("Dados recebidos para novo comentário:", dados) # Para depuração

    if not dados or 'conteudo' not in dados or 'id_usuario' not in dados:
        return jsonify({"sucesso": False, "mensagem": "Conteúdo e ID do usuário são obrigatórios"}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({"sucesso": False, "mensagem": "Erro de conexão com o banco de dados"}), 500

    cursor = conn.cursor()
    query = "INSERT INTO comentarios (id_filme, id_usuario, conteudo) VALUES (%s, %s, %s)"
    try:
        cursor.execute(query, (id_filme, dados['id_usuario'], dados['conteudo']))
        conn.commit()
        return jsonify({"sucesso": True, "mensagem": "Comentário adicionado com sucesso!"}), 201
    except mysql.connector.Error as err:
        conn.rollback()
        print("Erro de SQL:", err) # Para depuração
        return jsonify({"sucesso": False, "mensagem": f"Erro no banco de dados: {err}"}), 500
    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)