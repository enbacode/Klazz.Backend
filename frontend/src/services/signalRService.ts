import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAuthStore } from '@/stores/auth';

class SignalRService {
    private connection: HubConnection | null = null;

    async startConnection() {
        const authStore = useAuthStore();

        this.connection = new HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_API_URL}/hub/chat`, {
                accessTokenFactory: () => authStore.token || ''
            })
            .configureLogging(LogLevel.Information)
            .build();

        try {
            await this.connection.start();
            console.log('SignalR Connected');
        } catch (err) {
            console.log('SignalR Connection Error: ', err);
        }
    }

    async stopConnection() {
        if (this.connection) {
            await this.connection.stop();
        }
    }

    onReceiveMessage(callback: (user: string, message: string) => void) {
        this.connection?.on('ReceiveMessage', callback);
    }

    async sendMessage(user: string, message: string) {
        await this.connection?.invoke('SendMessage', user, message);
    }
}

export const signalRService = new SignalRService();