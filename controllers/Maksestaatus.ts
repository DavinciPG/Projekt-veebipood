import { Request, Response, Router } from "express";
import Maksestaatus from '../models/Maksestaatus';

const router: Router = Router();

router.post('/maksestaatus', async (req, res) => {
    const data = new Maksestaatus(req.body);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error})
    }
});


router.get('/maksestaatus', async (req: Request, res: Response) => {
    try{
        const data = await Maksestaatus.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.delete('/maksestaatus/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Maksestaatus.findByIdAndDelete(id)
        const data = await Maksestaatus.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/maksestaatus/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Maksestaatus.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;