
import {motion , AnimatePresence} from "framer-motion"
import "./../style/loadingAnim.scss" 
const Loading = () => {
    const BubbleAnim = {
        animate : {
            scale:[1,1.8,0.8],
            transition: {
                duration : 1,
                repeat:Infinity,
                type:"spring",

            }
        }
    }
    const bubbleOrchestre = {
        initial:{
            opacity:1
        },
        exit : {
            opacity : 0,
            transition: {
                duration : 1
            }
        }
    }
    return <>
<AnimatePresence>
<motion.div      
    variants = {bubbleOrchestre}
    className="bubbleMain"
    animate = "animate"
    initial = "initial"
    exit = "exit"
    >
    {  [1].map((item)=>{
        return <motion.div 
        key={item}
        variants = {BubbleAnim}
        className="bubble">
        </motion.div>}) 
    }
</motion.div>
</AnimatePresence>
</>
}



export default Loading