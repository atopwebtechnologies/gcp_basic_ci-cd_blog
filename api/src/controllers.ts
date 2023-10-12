import { Request, Response } from "express"
import prisma from "./db"


export async function addBlogPost(req: Request, res: Response) {
    const {title, content} = req.body;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content
            }
        })
        return res.status(201).json({message: "post created", data: post})
    } catch (error) {
        return res.status(500).json({error})
    }
 }

export async function updateBlogPost(req: Request, res: Response) { 
    const { title, content } = req.body
    const update = { title, content }
    console.log(update)
    const { postId } = req.params
    try {
        const post = await prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: update
        })
        if (!post) return res.status(204).end()
        return res.status(200).json({data: post})
    } catch (error) {
        return res.status(500).json({error})
    }
}

export async function getBlogPost(req: Request, res: Response) {
    const { postId } = req.params
    console.log(postId)
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            }
        })
        console.log(post, !post)
        if (!post) return res.status(204).end()
        return res.status(200).json({data: post})
    } catch (error) {
        return res.status(500).json({error})
    }
}

export async function getAllBlogPosts(req: Request, res: Response) {
    try {
        const posts = await prisma.post.findMany()
        if (posts.length === 0) return res.status(204).end()
        return res.status(200).json({data: posts})
    } catch (error) {
        return res.status(500).json({error})
    }
 }

export async function deleteBlogPost(req: Request, res: Response) {
    const { postId } = req.params
    try {
        const post = await prisma.post.delete({
            where: {
                id: Number(postId)
            }
        })
        if (!post) return res.status(204).end()
        return res.status(200).json({message: "post deleted"})
    } catch (error) {
        return res.status(500).json({error})
    }
}

