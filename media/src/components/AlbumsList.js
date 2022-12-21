import {useFetchAlbumsQuery} from '../store';

export default function AlbumsList({user}) {
    const {data, error, isLoading} = useFetchAlbumsQuery(user);

    return (
        <div>
            Albums for {user.name}
        </div>
    );
}