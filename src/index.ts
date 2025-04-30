import colors from 'colors';
import server from './server';

const PORT = process.env.PORT || 5000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(colors.bgMagenta(`Server is running on port ${PORT}`));
});