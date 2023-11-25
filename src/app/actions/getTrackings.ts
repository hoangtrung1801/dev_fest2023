import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getTrackings = async () =>{
    const currentUser = await getCurrentUser()
    if(!currentUser?.id) {
        return null
    }
    try {
//    get all trackings from the current user
        const trackings = await prisma.tracking.findMany({
            where:{
                userId: currentUser.id
            }
        })
        if(!trackings){
            return []
        }
        return trackings
    } catch (error) {
        console.log(error, 'Server Error in getting trackins')
        return []
        
    }
}

export default getTrackings