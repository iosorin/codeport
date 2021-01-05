import React, { FC, createContext, useContext, useMemo, useLayoutEffect } from 'react';
import { SocketService } from '../services';

const SocketContext: React.Context<SocketService> = createContext(new SocketService());

const SocketProvider: FC = ({ children }) => {
    const service = useMemo(() => new SocketService(), []);

    useLayoutEffect(() => {
        if (!service.socket) {
            service.init();
        }

        return service.disconnect;
    }, [service]);

    return <SocketContext.Provider value={service}>{children}</SocketContext.Provider>;
};

const useSocket = (): SocketService => useContext(SocketContext);

export { SocketProvider, useSocket };
