const QUERY = {
 
    ASSIGNMENT: {
        SELECT_ALL: 'SELECT * FROM Assignments', // can add --> LIMIT 10 <-- for limiting output to 10
        SELECT: 'SELECT * FROM Assignments WHERE assignment_id = ?',
        CREATE: 'INSERT INTO Assignments (title, description, due_date, teacher_id, subject_name) VALUES (?,?,?,?,?)',
        UPDATE: 'UPDATE Assignments SET title = ?, description = ? WHERE assignment_id = ?',
        DELETE: 'DELETE FROM Assignments WHERE assignment_id = ?'
    },
 
    USER: {
        SELECT_ALL: 'SELECT * FROM Users',  // For admins
        CREATE: 'INSERT INTO Users (name, email, role) VALUES (?, ?, ?)',
        UPDATE: 'UPDATE Users SET name = ?, email = ? WHERE user_id = ?',
        DELETE: 'DELETE FROM Users WHERE user_id = ?' 
    },

    SUBMISSION: {
        SELECT_ALL: 'SELECT * FROM Submissions',
        CREATE: 'INSERT INTO Submissions (assignment_id, student_id, file) VALUES (?, ?, ?)',
        UPDATE: 'UPDATE Submissions SET file = ? WHERE submission_id = ?', 
        DELETE: 'DELETE FROM Submissions WHERE submission_id = ?'
    }
};

export default QUERY;
