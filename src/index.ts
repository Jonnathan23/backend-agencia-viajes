import colors from 'colors';
import server from './server';

const port = process.env.PORT || 4000

console.log('Iniciando Rest Api... en el puerto: ', port);
server.listen(port, () => {
    console.log(colors.cyan.bold(`Rest Api funcionando en el puerto: ${port}`));
})