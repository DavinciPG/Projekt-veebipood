import { Request, Response, Router } from "express";
import Arverida from '../models/Arverida';

const router: Router = Router();

router.post('/arverida', async (req, res) => {
    const data = new Arverida(req.body);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});

router.get('/arverida', async (req: Request, res: Response) => {
    try{
        const data = await Arverida.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
});

router.delete('/arverida/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Arverida.findByIdAndDelete(id)
        const data = await Arverida.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/arverida/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Arverida.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;