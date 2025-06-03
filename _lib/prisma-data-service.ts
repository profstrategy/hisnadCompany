import { ActivePropertyPagePreview, ActivePropertyPreview, SingularPropertyPreview } from "@/constants/types";
import { prisma } from "@/_lib/prisma"

export const getActiveProperties = async ():Promise<ActivePropertyPreview[]> => {
    const activeProperties = await prisma.segregatedProperties.findMany({
        select: {
            id: true,
            slug: true,
            mainImage: true,
            title: true,
            location: true
        }
    })

    if(!activeProperties) {
        throw new Error('Unable to load packages, might be your network')
    }

    return activeProperties;
}

export const getAllProperties = async ():Promise<ActivePropertyPagePreview[]> => {
    const properties = await prisma.segregatedProperties.findMany({
        select: {
            id: true,
            tier: true,
            title: true,
            status: true,
            type: true,
            mainImage: true,
            location: true,
            price: true,
            slug: true
        }
    })

    if(!properties){
        throw new Error('Unable to load properties, might be your network')
    }

    return properties
}

export const getSingularProperty = async (slug:string):Promise<SingularPropertyPreview[]> => {
    const singularProperties = prisma.segregatedProperties.findMany({
        where: {
            slug: slug
        },
        select: {
            title:true,
            description: true,
            location: true,
            features: true,
            mainImage: true,
            benefit: true,
            price: true,
            payment: true,
            status: true,
            category: true,
            created_at: true,
            updated_at: true
        }
    })

    if(!singularProperties){
        throw new Error('Unable to load properties, might be your network')
    }

    return singularProperties
}