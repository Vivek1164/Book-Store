import express from 'express'
import { Book } from '../model/bookModel.js';

const router = express.Router();




router.post('/', async(req, res)=>{
    try {
        
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            const error = new Error("Please enter all valid fields.")
            error.statusCode = 400;
            throw error;
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);
        
        return res.status(200).send(newBook);
        

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });

    }
})


router.get('/:id', async(req,res)=>{

    try {
        const {id} = req.params;
        console.log(id);
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).json(book)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})

router.put('/:id', async(req, res)=>{
    try {

        if(!req.body.title || !req.body.author || !req.body.publishYear){
            const error = new Error("Please enter all valid fields.")
            error.statusCode = 400;
            throw error;
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(400).send({message: 'Book not found'})
        }

        return res.status(200).send({message: "book updated"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(400).send({message: 'Book not found'})
        }

        return res.status(200).send({message: "book deleted succesfully"});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})


router.get('/', async(req,res)=>{

    try {
        const book = await Book.find({});
        return res.status(200).json(book)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})

export default router;