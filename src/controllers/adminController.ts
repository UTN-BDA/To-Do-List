import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export const backupDatabase = (req, res) => {
    const fecha = new Date().toISOString().split('T')[0]; 
    const backupPath = path.join('backups', `backup-${fecha}`);

    
    if (!fs.existsSync('backups')) {
        fs.mkdirSync('backups');
    }

    const comando = `mongodump --db todolist --out ${backupPath}`;

    exec(comando, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al hacer el backup: ${stderr}`);
            return res.status(500).json({ message: 'Error al generar el backup' });
        }

        console.log(`Backup exitoso: ${stdout}`);
        res.json({ message: `Backup guardado en ${backupPath}` });
    });
};
