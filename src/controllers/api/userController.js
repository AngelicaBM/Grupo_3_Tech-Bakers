const { User }= require('../../dataBase/models');


module.exports = {
    list: (req, res) =>{
        User
        .findAll()
        .then(allUsers => {
           let users = [];
           allUsers.forEach(data => {
            let user = {
                id: data.id, 
                name: data.fullname, 
                email: data.email,
                detail: `/api/users/${data.id}`
            };
            users.push(user); 
           });

            return res.status(200).json({
                status: 200,
                count: allUsers.length,
                users
            })

        }).catch(error => {res.send({error:'Not found'});})

    },
    detail: (req, res) =>{
        User
        .findByPk(req.params.id)
        .then(user => {
            let{ password, roleId, RoleId, createdAt, updatedAt,...userDesctr } = user.dataValues;
            return res.status(200).json({
                userDesctr,
                status: 200
            });
        }).catch(error => {res.send({error:'Not found', error});}); 
    }
}
