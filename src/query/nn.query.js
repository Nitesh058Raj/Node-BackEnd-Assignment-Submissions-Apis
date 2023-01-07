const QUERY = {

    SELECT_USERS: 'SELECT * FROM nn LIMIT 10',  
    SELECT_USER: 'SELECT * FROM nn WHERE id = ?',
    CREATE_USER: 'INSERT INTO nn(e_num, first_name, last_name, email, phone, title, sub_name) VALUES (?,?,?,?,?,?,?) ',
    UPDATE_USER: 'UPDATE nn SET e_num = ?, first_name = ?, last_num = ?, email = ?, phone = ?, title = ?, sub_name = ? WHERE id = ?',
    DELETE_USER: 'DELETE FROM nn WHERE id = ?'
    

};

export default QUERY;
