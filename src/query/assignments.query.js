const QUERY = {

    SELECT_ASSIGNMENTS: 'SELECT * FROM assignments LIMIT 10',  
    SELECT_ASSIGNMENT: 'SELECT * FROM assignments WHERE id = ?',
    CREATE_ASSIGNMENT: 'INSERT INTO assignments( faculty_name, faculty_email, description, title, subject_name) VALUES (?,?,?,?,?) ',
    UPDATE_ASSIGNMENT: 'UPDATE assignments SET faculty_name = ?, faculty_email = ?, description = ?, title = ?, subject_name = ? WHERE id = ?',
    DELETE_ASSIGNMENT: 'DELETE FROM assignments WHERE id = ?'   

};

export default QUERY;
