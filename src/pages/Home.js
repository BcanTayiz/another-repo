import DataContainer from '../components/DataContainer';

import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';




export default function Home() {
 
  const {user} = useAuthContext()

  const {documents:payments } = useCollection('payments',['uid','==',user.uid])
  

  return (
    <div className="App">
       {user && <DataContainer payments={payments} />}
    </div>
  );
}
