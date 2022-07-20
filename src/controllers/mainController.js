const products = [
    {
        nombre : 'Cheesecake',
        precio : '$ 4.000',
        img : '/images/Productos/Cheesecake.jpeg'

    },

    {
        nombre : 'Lemon Pie',
        precio : '$ 2.500',
        img : '/images/Productos/LemonPie.jpeg'

    },    
    
    {
        nombre : 'Devils Cake',
        precio : '$ 2.900',
        img : '/images/Productos/DevilsCake.jpeg'

    },    
    
    {
        nombre : 'Tarta de Mango',
        precio : '$ 2.500',
        img : '/images/Productos/TartaMango.jpeg'

    },

    
];

const mainController = {
    index : (req,res)=>{
        res.render('products/index', {products})
    }
}

module.exports = mainController;