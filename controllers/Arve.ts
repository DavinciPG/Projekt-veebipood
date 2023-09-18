import { Request, Response, Router } from "express";
import Arve from '../models/Arve';

const router: Router = Router();

router.post('/arve', async (req, res) => {
    const data = new Arve(req.body);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});


router.get('/arve', async (req: Request, res: Response) => {
    try{
        const data = await Arve.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/arve/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Arve.findByIdAndDelete(id)
        const data = await Arve.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/arve/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Arve.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.get('/arve/maksmata', async (req, res) => {
    try {
        const arved = await Arve.find({ maksestaatus: 'Maksmata' });
        res.send(arved);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/arve/maksmata/uletatud', async (req, res) => {
    try {
        const currentDate = new Date();
        const arved = await Arve.find({ maksestaatus: 'Maksmata', kuupäev: { $lt: currentDate } });
        res.send(arved);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/arve/maksmata/:klientId', async (req, res) => {
    try {
        const arved = await Arve.find({ klient: req.params.klientId, maksestaatus: 'Maksmata' });
        res.send(arved);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/arve/maksmata/uletatud/:klientId', async (req, res) => {
    try {
        const currentDate = new Date();
        const arved = await Arve.find({ klient: req.params.klientId, maksestaatus: 'Maksmata', kuupäev: { $lt: currentDate } });
        res.send(arved);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/arve/:klientId', async (req, res) => {
    try {
        const arved = await Arve.find({ klient: req.params.klientId });
        res.send(arved);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/arve/summa/:klientId', async (req, res) => {
    try {
        const arved = await Arve.find({ klient: req.params.klientId });
        const summa = arved.reduce((total, arve) => {
            if (arve.kogusumma !== undefined) {
                return total + arve.kogusumma;
            } else {
                return total + 0;
            }
        }, 0);
        res.send({ summa });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;