const QUERY = {
 
    ASSIGNMENT: {
        SELECT_ALL: 'SELECT * FROM Assignments', // can add --> LIMIT 10 <-- for limiting output to 10
        SELECT: 'SELECT * FROM Assignments WHERE assignment_id = ?',
        CREATE: 'INSERT INTO Assignments (title, description, due_date, grade,teacher_id, subject_name) VALUES (?,?,?,?,?,?)',
        UPDATE: 'UPDATE Assignments SET title = ?, description = ? WHERE assignment_id = ?',
        DELETE: 'DELETE FROM Assignments WHERE assignment_id = ?'
    },
 
    USER: { // For admins
        SELECT_ALL: 'SELECT * FROM Users',  
        SELECT: 'SELECT * FROM Users WHERE user_id = ?',
        CREATE: 'INSERT INTO Users (name, email, role) VALUES (?, ?, ?)',
        UPDATE: 'UPDATE Users SET name = ?, email = ? WHERE user_id = ?',
        DELETE: 'DELETE FROM Users WHERE user_id = ?',
        EMAIL: 'SELECT * FROM Users WHERE email = ?',
        CREATE_AND_RUTURN: 'CALL create_and_return(?,?,?)'
    },

    Assign: {
        PROVIDE: 'INSERT INTO Asisgned (assignment_id, student_id) VALUES (? , ?)'
    },


    SUBMISSION: {
        SELECT_ALL: 'SELECT * FROM Submissions',
        SELECT: 'SELECT * FROM Submissions WHERE submission_id = ?',
        CREATE: 'INSERT INTO Submissions (assignment_id, student_id, docs) VALUES (?,?,?)',
        UPDATE: 'UPDATE Submissions SET docs = ? WHERE submission_id = ?', 
        DELETE: 'DELETE FROM Submissions WHERE submission_id = ?'
    },

    SORT: {
        DUE_DATE: 'SELECT * FROM Assignments ORDER BY due_date ASC',
        GRADE:'SELECT * FROM Assignments ORDER BY grade DESC'
    }
};

export default QUERY;
