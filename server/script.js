// const mysql =  require('mysql')
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "896704",
//     database: "userdata"
// })

// connection.connect(
//     function(err) {
//         if(err) {throw err}
//         connection.query('INSERT INTO userdata(username, password) VALUES("duapuluh", "duapuluh")', function(err, result,field) {
//             if(err) throw err
//             console.log("result : ", result)
//             console.log("field : ",field)
//         })

//         connection.query('DELETE FROM userdata WHERE user_id = 19', (err,result,field) => {
//             if(err) throw err
//             console.log("delete : ", result);
//             console.log(field)
//         })

       
//         connection.query('UPDATE userdata SET username = "delapanbelas", password="delapanbelas" WHERE user_id = 18', function(err, result, field) {
//             if(err) throw err
//             console.log("edit : ", result)
//         })
        
//         connection.query("SELECT username, password FROM `userdata`", function(err, result, field) {
//             console.log(result)
//         })
        
//     }
// )