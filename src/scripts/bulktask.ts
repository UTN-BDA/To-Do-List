import db from '../config/db';
import { TestTask } from '../models/test_task'; 

const TOTAL_TASKS = 500_000;
const BATCH_SIZE = 1000;

const createFakeTask = (index: number) => ({
    title: `Tarea número ${index}`,
    description: `Descripción generada para la tarea número ${index}`,
    status: false,  
});

const seedTasks = async () => {
    console.time('⏱ Tiempo total');
    console.log(`🔄 Comenzando a insertar ${TOTAL_TASKS} tareas en lotes de ${BATCH_SIZE}...`);

    try {
        await db.authenticate();
        console.log('✅ Conexión a la base de datos establecida.');

        let totalInsertadas = 0;

        for (let i = 0; i < TOTAL_TASKS; i += BATCH_SIZE) {
            const cantidadRestante = TOTAL_TASKS - i;
            const cantidadActual = Math.min(BATCH_SIZE, cantidadRestante);

            const batch = Array.from({ length: cantidadActual }, (_, j) =>
                createFakeTask(i + j + 1)
            );

            await TestTask.bulkCreate(batch);
            totalInsertadas += cantidadActual;

            if (totalInsertadas % 10000 === 0) {
                console.log(`Insertadas ${totalInsertadas} tareas hasta ahora...`);
            }
        }

        console.log(`🎉 Se insertaron ${totalInsertadas} tareas en total.`);
        await db.close();
        console.timeEnd('⏱ Tiempo total');
    } catch (error) {
        console.error('Error al insertar tareas:', error);
        await db.close();
    }
};

seedTasks();
