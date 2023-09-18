import { Request, Response, Router } from "express";
import Klient from '../models/Klient';

const router: Router = Router();

router.post('/klient', async (req, res) => {
    const data = new Klient(req.body);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});


router.get('/klient', async (req: Request, res: Response) => {
    try{
        const data = await Klient.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/klient/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Klient.findByIdAndDelete(id)
        const data = await Klient.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/klient/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Klient.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;