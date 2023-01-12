const QUERY = {
 
    Assignment: {
        SELECT_ASSIGNMENTS: 'SELECT * FROM Assignments', // can add --> LIMIT 10 <-- for limiting output to 10
        SELECT_ASSIGNMENT: 'SELECT * FROM Assignments WHERE assignment_id = ?',
        CREATE_ASSIGNMENT: 'INSERT INTO Assignments (title, description, due_date, teacher_id, subject_name) VALUES (?,?,?,?,?)',
        UPDATE_ASSIGNMENT: 'UPDATE Assignments SET title = ?, description = ? WHERE assignment_id = ?',
        DELETE_ASSIGNMENT: 'DELETE FROM Assignments WHERE assignment_id = ?'
    },
 
    User: {
        SELECT_USER: 'SELECT * FROM Users',  // For admins
        CREATE_USER: 'INSERT INTO Users (name, email, role) VALUES (?, ?, ?)',
        UPDATE_USER: 'UPDATE Users SET name = ?, email = ? WHERE user_id = ?',
        DELETE_USER: 'DELETE FROM Users WHERE user_id = ?' 
    },

    Submission: {
        SELECT_SUBMISSION: 'SELECT * FROM Submissions',
        CREATE_SUBMISSION: 'INSERT INTO Submissions (assignment_id, student_id, file) VALUES (?, ?, ?)',
        UPDATE_SUBMISSION: 'UPDATE Submissions SET file = ? WHERE submission_id = ?', 
        DELETE_SUBMISSION: 'DELETE FROM Submissions WHERE submission_id = ?'
    }
};

export default QUERY;
