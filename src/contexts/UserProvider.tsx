import React,{createContext,useContext} from 'react';



const BlogContext = createContext({});

export const useUser = () => {
    const context = useContext(BlogContext);
    if(!context) {
        throw new Error("Parent should suck a cock")
    }
    return context;
}

function UserProvider({children}:any) {
    const user = {
        name:"cocksucker",
        avatar:"https://i.pravatar.cc/300"
    }
  return (
    <BlogContext.Provider
        value={
            user
        }
    >
        {children}
    </BlogContext.Provider>
  )
}

export default UserProvider