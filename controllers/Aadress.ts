import { Request, Response, Router } from "express";
import Aadress from '../models/Aadress';

const router: Router = Router();

router.post('/aadress', async (req, res) => {
    const data = new Aadress(req.body);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});

router.get('/aadress', async (req: Request, res: Response) => {
    try{
        const data = await Aadress.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
});


router.delete('/aadress/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Aadress.findByIdAndDelete(id)
        const data = await Aadress.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/aadress/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Aadress.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;