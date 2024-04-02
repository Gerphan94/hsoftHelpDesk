import getpass
import oracledb
from flask import Flask, jsonify

app = Flask(__name__)

connection = oracledb.connect(
    user="hsofttamanh",
    password='hsofttamanh',
    dsn="hsoft-dev.vdc.tahcm.vn/dev3")

print("Successfully connected to Oracle Database")
cursor = connection.cursor()

@app.route('/hien_dien/<pid>', methods=['GET'])
def hien_dien(pid):
    pid_str = str(pid)
    obj = []
    stm = f'''
        SELECT A.ID, A.MABN, A.NGAYVV, B.TENKP, A.MAVAOVIEN, A.MAQL  
        FROM hsofttamanh.HIENDIEN A 
        INNER JOIN hsofttamanh.BTDKP_BV B ON A.MAKP = B.MAKP
        WHERE A.mabn = {pid_str}
    '''
    hien_diens = cursor.execute(stm).fetchall()
    
    for hien_dien in hien_diens:
        obj.append({
            'id': hien_dien[0],
            'pid': hien_dien[1],
            'ngayvv': hien_dien[2],
            'tenkp': hien_dien[3],
            'mavaovien': hien_dien[4],
            'maql': hien_dien[5]
        })
    return jsonify(obj)

if __name__=='__main__':
    app.run(debug=True)