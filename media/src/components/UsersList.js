import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers, addUser} from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

export default function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setLoadingUsersError] = useState(null);
    const dispatch = useDispatch();
    const {data} = useSelector((state => {
        // { data: [], isLoading: false, error: null }
        return state.users;
    }));

    useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            // unwrap returns a promise that "then" is called *only* when
            // a successful call had being done (unlike regular promise
            // where "then" is called for successful or failed call)
            .unwrap()
            .catch((err) => setLoadingUsersError(err))
            .finally(() => setIsLoadingUsers(false));
    }, [dispatch]);

    const handleUserAdd = () => {
        dispatch(addUser());
    };

    if (isLoadingUsers) {
        return <Skeleton times={6} className="h-10 w-full"/>;
    }

    if (loadingUsersError) {
        return <div>Error fetching data...</div>;
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick={handleUserAdd}>
                    + Add User
                </Button>
            </div>
            {renderedUsers}
        </div>
    );

    return 'Users List';
}