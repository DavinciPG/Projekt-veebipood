import { Request, Response, Router } from "express";
import Toode from '../models/Toode';

const router: Router = Router();

router.post('/toode', async (req, res) => {
    const data = new Toode(req.body);

    try {
        if (data.vananemisaeg && data.vananemisaeg < new Date()) {
            return res.status(400).send({ error: 'Vananemisaeg ei saa olla minevikus.' });
        }

        // @ts-ignore
        if (data.hind <= 0) {
            return res.status(400).send({ error: 'Hind peab olema suurem kui 0.' });
        }

        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});


router.get('/toode', async (req: Request, res: Response) => {
    try{
        const data = await Toode.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/toode/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Toode.findByIdAndDelete(id)
        const data = await Toode.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/toode/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Toode.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;