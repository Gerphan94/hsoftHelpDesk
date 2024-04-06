import getpass
import oracledb
from flask import Flask, jsonify
from flask_cors import CORS
import datetime as dt

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# connection = oracledb.connect(
#     user="hsofttamanh",
#     password='hsofttamanh',
#     dsn="hsoft-dev.vdc.tahcm.vn/dev3")

def conn_info(env):
   
    if (env == 'HN_LIVE'):
        return {
            'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"hsoft-primary.bvta.vn/hsoft.quang"
        }
    else:
        return {
            'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"hsoft-dev.vdc.tahcm.vn/dev3"
        }
    
@app.route('/hien_dien/<site>/<pid>', methods=['GET'])
def hien_dien(site ,pid):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = {}
    stm = f'''
        SELECT A.ID, A.MABN, to_char(A.NGAYVV, 'dd/MM/yyyy HH24:MI') as NGAYVV, to_char(A.NGAY, 'dd/MM/yyyy HH24:MI') as NGAYNK  , B.TENKP, A.MAVAOVIEN, A.MAQL  
        FROM hsofttamanh.HIENDIEN A
        INNER JOIN hsofttamanh.BTDKP_BV B ON A.MAKP = B.MAKP
        WHERE A.mabn = '{pid}'
    '''
    noitrus = cursor.execute(stm).fetchall()
    # RETURN EMPTY IF DONT EXIST
    if (len(noitrus) == 0):
        return jsonify({'hien_dien': [], 'person_info': {}})
    obj_hd = []
    for noitru in noitrus:
        obj_hd.append({
            'id': str(noitru[0]),
            'pid': str(noitru[1]),
            'ngayvv': noitru[2],
            'ngaynk': noitru[3],
            'tenkp': noitru[4],
            'mavaovien': str(noitru[5]),
            'maql': str(noitru[6]),
            'loaiba':'Nội trú'
        })
   
    stm2 = f'''
        SELECT MABN, HOTEN, to_char(NGAYSINH, 'dd/MM/yyyy') AS NGAYSINH, 
            CASE
                WHEN PHAI = 0 THEN 'Nam'
                ELSE 'Nữ'
            END AS PHAI
        FROM hsofttamanh.BTDBN 
        WHERE MABN = '{pid}'
    '''
    obj_person = {}
    person_info = cursor.execute(stm2).fetchall()[0]
    if(person_info):
        obj_person['pid'] = str(person_info[0]) 
        obj_person['hoten'] = person_info[1]
        obj_person['ngaysinh'] = person_info[2]
        obj_person['phai'] = person_info[3]
    
    result['hien_dien'] = obj_hd
    result['person_info'] = obj_person
    return jsonify(result)

@app.route('/hien_dien/dutru_benhnhan/<site>/<hiendien_id>', methods=['GET'])
def hien_dien_dutru_benhnhan(site , hiendien_id):
    
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    hiendien_stm = f"SELECT MAVAOVIEN, NGAYVV FROM HSOFTTAMANH.HIENDIEN WHERE ID = '{hiendien_id}'"
    hiendien = cursor.execute(hiendien_stm).fetchall()[0]
    hiendien_mavv = hiendien[0]
    # hiendien_ngayvv = hiendien[1]
    schema = 'HSOFTTAMANH0424'
    
    stm = f'''
        SELECT ID, IDDUYET FROM {schema}.D_DUTRULL A
        WHERE MAVAOVIEN = '{hiendien_mavv}'
    '''
    print(stm)
    result = []
    dutrus = cursor.execute(stm).fetchall()
    
    for dutru in dutrus:
        obj = {}
        idPhieu = dutru[0]
        idDuyet = dutru[1]
        stm = f'''
            SELECT DD.id, to_char(DD.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAY, DLP.TEN, 
            to_char(DD.NGAYTAO, 'dd/MM/yyyy HH24:MI:SS') as NGAYTAO, 
            to_char(DD.NGAYUD, 'dd/MM/yyyy HH24:MI:SS') AS NGAYUD,
            CASE
                WHEN DD.DONE = 0 THEN 'Mới'
                WHEN DD.DONE = 1 THEN 'Đã chuyển'
                ELSE 'UnKnown'
            END AS TRANGTHAI
            FROM {schema}.D_DUYET DD
            INNER JOIN HSOFTTAMANH.D_LOAIPHIEU DLP ON DLP.id = DD.PHIEU
            WHERE DD.id = '{idDuyet}'
        '''
        phieu = cursor.execute(stm).fetchall()[0]
        
        obj['phieu'] = {
            "id": phieu[0],
            "ngay": phieu[1],
            "ten": phieu[2],
            "ngaytao": phieu[3],
            "ngayud": phieu[4],
            "trangthai": phieu[5]
        }
        chitiet_ar = []
        
        stm2 = f'''
        SELECT A.STT,D.MA, D.TEN,A.DUONGDUNG, B.DOITUONG,A.DONGIA, A.SLYEUCAU, C.TEN AS TENKHO
        FROM {schema}.D_DUTRUCT A
        INNER JOIN HSOFTTAMANH.D_DOITUONG B ON A.MADOITUONG = B.MADOITUONG 
        INNER JOIN HSOFTTAMANH.D_DMKHO C ON A.MAKHO = C.ID
        INNER JOIN HSOFTTAMANH.D_DMBD D ON A.MABD = D.ID
        WHERE A.id = '{idPhieu}'
        '''
        chitiets = cursor.execute(stm2).fetchall()
        for chitiet in chitiets:
            chitiet_ar.append({
                'stt': chitiet[0],
                'mathuoc': chitiet[1],
                'tenthuoc': chitiet[2],
                'duongdung': chitiet[3],
                'doituong': chitiet[4],
                'dongia': chitiet[5],
                'slyeucau': chitiet[6],
                'kho': chitiet[7]
            })
        obj['chitiet'] = chitiet_ar
        
        result.append(obj)
    return jsonify(result)

if __name__=='__main__':
    app.run(debug=True)