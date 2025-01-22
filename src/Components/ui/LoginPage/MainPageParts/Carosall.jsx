import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { data } from "./carosalData";
function Carosall() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1300 },
          items: 3
        },
        desktop: {
          breakpoint: { max:1300, min: 1024 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 1024, min: 840 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 840, min: 0 },
          items: 1
        }
      };
  return (
    <Carousel responsive={responsive} className='' showDots={true}  itemClass="px-2"
    >
      {data.map((x)=>{return(
       <div key={x.id} className='flex flex-col items-center gradienttopbottom shadow-lg w-full rounded-md  px-[32px] py-[56px] flex-grow h-[300px] border-[0.09px] border-primaryClr'>
             {/* <div>
                 <img src={Ipad} width={'360px'} height={'360px'} className='max-w-[360px] max-h-[360px]'></img>
             </div> */}
             <div className='flex flex-col items-center gap-[16px] self-stretch'>
                <p className='text-[20px] font-[700] leading-[40px] py-2 border-b-2 border-primaryClr'>{x.title}</p>
                

                <p className='text-[14px] font-[500] leading-[24px] text-center'>{x.para}</p>
           </div>
       </div>)})}
       
       
        
</Carousel> 
  )
}

export default Carosall