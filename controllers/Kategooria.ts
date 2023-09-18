import { Request, Response, Router } from "express";
import Kategooria from '../models/Kategooria';

const router: Router = Router();

router.post('/kategooria', async (req, res) => {
    const data = new Kategooria({
        nimetus: req.body.nimetus
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});

router.get('/kategooria', async (req: Request, res: Response) => {
    try{
        const data = await Kategooria.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
});


router.delete('/kategooria/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Kategooria.findByIdAndDelete(id)
        const data = await Kategooria.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/kategooria/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Kategooria.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;