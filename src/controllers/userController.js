const userController = {
    login : (req,res)=>{
        res.render('users/login')
    },

    register : (req,res)=>{
        res.render('users/register')
    },
    create : (req,res)=>{
        res.render('products/create');
    },
    
    store : (req, res) => {
		let imagenes= []

        for(let i = 0 ; i<req.files.length;i++){
            imagenes.push(req.files[i].filename)
        }
        console.log(req.files)
		const newProduct = {
			...req.body,
			image: req.files.length >= 1  ? imagenes : ["default-image.png"]
		}
		productModel.create(newProduct)
		res.redirect('/')
	},
}

module.exports = userController;