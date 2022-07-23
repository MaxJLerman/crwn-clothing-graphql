import DirectoryItem from '../directory-item/directory-item.compound';

import { DirectoryContainer } from './directory.styles.jsx';

const Directory = ({ categories }) => 
{
    return(
        <DirectoryContainer>
        {
            categories.map((category) => <DirectoryItem key={category.id} category={category} /> )
        }
        </DirectoryContainer>
    );
}

export default Directory;