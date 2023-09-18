import { Request, Response, Router } from "express";
import Toode from '../models/Toode';
import axios from "axios";

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

router.get('/toode/aegunud', async (req, res) => {
    try {
        const currentDate = new Date();
        const aegunudTooted = await Toode.find({ vananemisaeg: { $lt: currentDate } });
        res.send(aegunudTooted);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/toode/maksumus', async (req, res) => {
    try {
        const tooted = await Toode.find();
        const totalMaksumus = tooted.reduce((total, toode) => total + (toode.hind || 0), 0);
        res.send({ totalMaksumus });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/toode/aegunud-maksumus', async (req, res) => {
    try {
        const currentDate = new Date();
        const expiredTooted = await Toode.find({ vananemisaeg: { $lt: currentDate } });
        const totalAegunudMaksumus = expiredTooted.reduce((total, toode) => total + (toode.hind || 0), 0);
        res.send({ totalAegunudMaksumus });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/toode/mitteaktiivsed', async (req, res) => {
    try {
        const mitteaktiivsedTooted = await Toode.find({ aktiivne: false });
        res.send(mitteaktiivsedTooted);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/toode/aktiivsed', async (req, res) => {
    try {
        const aktiivsedTooted = await Toode.find({ aktiivne: true });
        res.send(aktiivsedTooted);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/toode/foto/:id', async (req, res) => {
    try {
        const photoId = parseInt(req.params.id, 10);
        const response = await axios.get<{ id: number }[]>(`https://jsonplaceholder.typicode.com/photos`);
        const photos = response.data;

        const getPhotoById = (photoId: number) => {
            const photo = photos.find((p) => p.id === photoId);
            return photo || null; // Return the found photo or null if not found
        };
        const retrievedPhoto = getPhotoById(photoId);

        if (retrievedPhoto) {
            res.send(retrievedPhoto);
        } else {
            res.status(404).send({ error: 'Photo not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;