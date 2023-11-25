import Image from "next/image"
import AuthForm from "./components/AuthForm"

const Auth = () => {
 return(
    <div className="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8 
   ">
          <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <Image
          height="20"
          width="20"
          className="mx-auto w-auto rounded-2xl md:w-[200px] md:h-[200px]"
          src="/logo.png"
          alt="Logo"
        />
      
      </div>
      
      <AuthForm/>
    </div>
 )

}


export default Auth