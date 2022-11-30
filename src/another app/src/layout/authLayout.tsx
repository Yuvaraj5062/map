import React,{Suspense} from 'react'

interface authLayoutProps {
children:React.ReactNode
}
const loading = () => <div></div>

 const authLayout: React.FC<authLayoutProps> = ({children}) => {
    const child = children || null;
        return (<Suspense fallback={loading()}>
            {child}
        </Suspense> );
}
export default authLayout