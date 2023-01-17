const QUERY = {
 
    ASSIGNMENT: {
        SELECT_ALL: 'SELECT * FROM Assignments', // can add --> LIMIT 10 <-- for limiting output to 10
        SELECT: 'SELECT * FROM Assignments WHERE assignment_id = ?',
        CREATE: 'INSERT INTO Assignments (title, description, due_date, grade,teacher_id, subject_name) VALUES (?,?,?,?,?,?)',
        UPDATE: 'UPDATE Assignments SET title = ?, description = ? WHERE assignment_id = ?',
        DELETE: 'DELETE FROM Assignments WHERE assignment_id = ?'
    },
 
    USER: {
        SELECT_ALL: 'SELECT * FROM Users',  // For admins
        CREATE: 'INSERT INTO Users (name, email, role) VALUES (?, ?, ?)',
        UPDATE: 'UPDATE Users SET name = ?, email = ? WHERE user_id = ?',
        DELETE: 'DELETE FROM Users WHERE user_id = ?',
        EMAIL: 'SELECT * FROM Users WHERE user_id = ?'
    },

    SUBMISSION: {
        SELECT_ALL: 'SELECT * FROM Submissions',
        CREATE: 'INSERT INTO Submissions (assignment_id, student_id, document) VALUES (?,?,?)',
        UPDATE: 'UPDATE Submissions SET file = ? WHERE submission_id = ?', 
        DELETE: 'DELETE FROM Submissions WHERE submission_id = ?'
    },

    SORT: {
        DUE_DATE: 'SELECT * FROM Assignments ORDER BY due_date ASC',
        GRADE:'SELECT * FROM Assignments ORDER BY grade DESC'
    }
};

export default QUERY;
