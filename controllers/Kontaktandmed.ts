import { Request, Response, Router } from "express";
import Kontaktandmed from '../models/Kontaktandmed';

const router: Router = Router();

router.post('/kontaktandmed', async (req, res) => {
    const data = new Kontaktandmed(req.body);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});


router.get('/kontaktandmed', async (req: Request, res: Response) => {
    try{
        const data = await Kontaktandmed.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/kontaktandmed/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Kontaktandmed.findByIdAndDelete(id)
        const data = await Kontaktandmed.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/kontaktandmed/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Kontaktandmed.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;