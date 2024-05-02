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
    elif (env == 'HN_DEV'):
        return {
            'user':"hsofttamanh",
            'password':'hsofttamanh',
            'dsn':"192.168.8.5/hndev"
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
        return jsonify({'hiendien': [], 'personinfo': {}})
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
    
    result['hiendien'] = obj_hd
    result['personinfo'] = obj_person
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
        SELECT IDDUYET FROM {schema}.D_DUTRULL A
        WHERE MAVAOVIEN = '{hiendien_mavv}'
    '''

    result = []
    phieus = cursor.execute(stm).fetchall()
    
    for phieuId in phieus:
        id_duyet = phieuId[0]
        obj = {}
        stm = f'''
            SELECT A.id, to_char(A.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAY, B.TEN, C.TEN AS DUOCKP,
            to_char(A.NGAYTAO, 'dd/MM/yyyy HH24:MI:SS') as NGAYTAO, 
            to_char(A.NGAYUD, 'dd/MM/yyyy HH24:MI:SS') AS NGAYUD,
            CASE
                WHEN A.DONE = 0 THEN 'Mới'
                WHEN A.DONE = 1 THEN 'Chuyển đi'
                WHEN A.DONE = 2 THEN 'Duyệt'
                WHEN A.DONE = 3 THEN 'Lấy số liệu'
                ELSE to_char(A.DONE)
            END AS TRANGTHAI
            FROM {schema}.D_DUYET A
            INNER JOIN HSOFTTAMANH.D_LOAIPHIEU B ON B.id = A.PHIEU
            INNER JOIN HSOFTTAMANH.D_DUOCKP C ON A.MAKP = C.ID 
            WHERE A.id = '{id_duyet}'
        '''
        phieu = cursor.execute(stm).fetchall()[0]
        
        obj = {
            "id": str(phieu[0]),
            "ngay": phieu[1],
            "ten": phieu[2],
            'duockp': phieu[3],
            "ngaytao": phieu[4],
            "ngayud": phieu[5],
            "trangthai": phieu[6]
        }
        result.append(obj)
    return jsonify(result)


@app.route('/hien_dien/dutruCT/<site>/<id>', methods=['GET'])
def dutruCT(site , id):
    schema = 'HSOFTTAMANH0424'

    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    result = []
    
    stm = f'''
        SELECT A.ID, A.MABN, B.HOTEN  FROM {schema}.D_DUTRULL A 
        INNER JOIN HSOFTTAMANH.BTDBN B ON A.MABN = B.MABN
        WHERE A.IDDUYET  =  {id}
    '''
    dutrull = cursor.execute(stm).fetchall()
    
    for dutru in dutrull:
        dutru_id = dutru[0]
        pid = dutru[1]
        hoten = dutru[2]
        stm2 = f'''
            SELECT A.STT, D.MA, D.TEN, A.DUONGDUNG, B.DOITUONG, A.DONGIA, A.SLYEUCAU, C.TEN, A.DALIEU
            FROM {schema}.D_DUTRUCT A
            INNER JOIN HSOFTTAMANH.D_DOITUONG B ON A.MADOITUONG = B.MADOITUONG 
            INNER JOIN HSOFTTAMANH.D_DMKHO C ON A.MAKHO = C.ID
            INNER JOIN HSOFTTAMANH.D_DMBD D ON A.MABD = D.ID
            WHERE A.ID = '{dutru_id}'
        '''
        thuocs = cursor.execute(stm2).fetchall()
        
        thuoc_ar = []
        for thuoc in thuocs:
            thuoc_ar.append({
                "stt": thuoc[0],
                "mathuoc": thuoc[1],
                "tenthuoc": thuoc[2],
                "duongdung": thuoc[3],
                "doituong": thuoc[4],
                "dongia": thuoc[5],
                "slyc": thuoc[6],
                "tenkho": thuoc[7],
                "dalieu": thuoc[8]
            })
        result.append({
            'mabn': pid,
            "hoten": hoten,
            "thuoc": thuoc_ar
        })
    print(list(result))
    return jsonify(result)

@app.route('/khambenh/<site>/<ngay>', methods=['GET'])
def khambenh(site , ngay):
    imonth = ngay[4:6]
    iyear = ngay[2:4]
    schema = "HSOFTTAMANH" + imonth + iyear
  
    result = []
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    
    stm = f'''
        SELECT A.MABN, C.HOTEN,
        CASE
            WHEN C.PHAI = 0 THEN 'Nam'
            ELSE 'Nữ'
        END AS PHAI,
        TO_CHAR(C.NGAYSINH, 'dd/MM/yyyy') as NGAYSINH  , B.TENKP, D.DOITUONG, TO_CHAR(A.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAYTN,
        TO_CHAR(E.NGAY, 'dd/MM/yyyy HH24:MI:SS') as NGAYKB, A.DONE 
        FROM {schema}.TIEPDON A
        INNER JOIN HSOFTTAMANH.BTDKP_BV B ON A.MAKP = B.MAKP
        INNER JOIN HSOFTTAMANH.BTDBN C ON A.MABN  = C.MABN
        INNER JOIN HSOFTTAMANH.DOITUONG D ON A.MADOITUONG = D.MADOITUONG
        LEFT  JOIN {schema}.BENHANPK E ON A.MAQL = E.MAQL
        WHERE  TO_CHAR(A.NGAY, 'yyyyMMdd') = '{ngay}'
        ORDER BY A.NGAY ASC
    '''
    
    khambenhs = cursor.execute(stm).fetchall()
    for kb in khambenhs:
        result.append({
            "mabn": kb[0],
            "hoten": kb[1],
            "phai": kb[2],
            "ngaysinh": kb[3],
            "tenkp": kb[4],
            "doituong": kb[5],
            "ngaytn": kb[6],
            "ngaykb": kb[7],
            "done": kb[8]
            
        })
    
    
    return jsonify(result)
    
    

@app.route('/datkham/error_datkham/<site>/<ngay>/<upper>', methods=['GET'])
def error_datkham(site , ngay, upper):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    if (upper):
        stm = f'''
            SELECT A.MABN, C.HOTEN , A.KHAM , A.MAKP, B.TENKP, to_char(A.DEN, 'dd/MM/yyyy HH24:MI:SS') as NGAY, A.DONE
            FROM HSOFTTAMANH.DATKHAM  A
            INNER JOIN HSOFTTAMANH.BTDKP_BV B ON A.MAKP = B.MAKP
            INNER JOIN HSOFTTAMANH.BTDBN C ON A.MABN = C.MABN
            WHERE to_char(A.DEN,'yyyyMMdd') = '{ngay}' AND UPPER(TRIM(A.KHAM)) <> UPPER(TRIM(B.TENKP))
        '''
    else:
        stm = f'''
            SELECT A.MABN, C.HOTEN , A.KHAM , A.MAKP, B.TENKP, to_char(A.DEN, 'dd/MM/yyyy HH24:MI:SS') as NGAY, A.DONE
            FROM HSOFTTAMANH.DATKHAM  A
            INNER JOIN HSOFTTAMANH.BTDKP_BV B ON A.MAKP = B.MAKP
            INNER JOIN HSOFTTAMANH.BTDBN C ON A.MABN = C.MABN
            WHERE to_char(A.DEN,'yyyyMMdd') = '{ngay}' AND (A.KHAM) <> (B.TENKP)
        '''
    ds = cursor.execute(stm).fetchall()
    for bn in ds:
        result.append(
            {
                "mabn": bn[0],
                "hoten": bn[1],
                "khamhen": bn[2],
                "makp": bn[3],
                "tenkp": bn[4],
                "ngay": bn[5],
                "done": bn[6]
            }
        )
    return jsonify(result)

# DƯỢC
@app.route('/duoc/danhmuc/<site>', methods=['GET'])
def duoc_danhmuc(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    return jsonify(result)

@app.route('/duoc/tonbhyt/<site>', methods=['GET'])
def tonbhyt(site):
    cn = conn_info(site)
    connection = oracledb.connect(user=cn['user'],password=cn['password'],dsn=cn['dsn'])
    cursor = connection.cursor()
    result = []
    
    stm = '''
        SELECT A.MA, A.TEN, A.SLTHAUBH AS TONBH_BD, 
        (A.SLTHAUBH - A.SLTHAUBH_SUDUNG) AS TONBH_THUC,
        SLTHAUBH_SUDUNG AS DADUNG,
        A.SLTHAUBH_YEUCAU AS TONBH_TREO,
        (A.SLTHAUBH - A.SLTHAUBH_SUDUNG - A.SLTHAUBH_YEUCAU) AS TONBH_KD
        FROM HSOFTTAMANH.D_DMBD A
        WHERE A.SLTHAUBH <> 0
    '''
    datas = cursor.execute(stm).fetchall()
    for data in datas:
        result.append({
            "ma": data[0],
            "ten": data[1],
            "tonbd": data[2],
            "tonthuc": data[3],
            "dadung": data[4],
            "tontreo": data[5],
            "tonkd": data[6]
        })

    return jsonify(result)

    
if __name__=='__main__':
    app.run(debug=True)
    
    
    # stm2 = f'''
    #     SELECT A.STT,D.MA, D.TEN,A.DUONGDUNG, B.DOITUONG,A.DONGIA, A.SLYEUCAU, C.TEN AS TENKHO
    #     FROM {schema}.D_DUTRUCT A
    #     INNER JOIN HSOFTTAMANH.D_DOITUONG B ON A.MADOITUONG = B.MADOITUONG 
    #     INNER JOIN HSOFTTAMANH.D_DMKHO C ON A.MAKHO = C.ID
    #     INNER JOIN HSOFTTAMANH.D_DMBD D ON A.MABD = D.ID
    #     WHERE A.id = '{idPhieu}'
    #     '''
    #     chitiets = cursor.execute(stm2).fetchall()
    #     for chitiet in chitiets:
    #         chitiet_ar.append({
    #             'stt': chitiet[0],
    #             'mathuoc': chitiet[1],
    #             'tenthuoc': chitiet[2],
    #             'duongdung': chitiet[3],
    #             'doituong': chitiet[4],
    #             'dongia': chitiet[5],
    #             'slyeucau': chitiet[6],
    #             'kho': chitiet[7]
    #         })