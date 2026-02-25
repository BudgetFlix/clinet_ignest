package hu.BudgetFlix.service;

import com.jcraft.jsch.*;
import hu.BudgetFlix.config.MediaUploaderConfig;
import hu.BudgetFlix.model.Stat;

import java.io.InputStream;

public class SftpService {

    private  ChannelSftp channelSftp;
    private Session session;


    public SftpService() {

    }


    public void setupJsch( String password) throws JSchException {
        JSch jsch = new JSch();

        session = jsch.getSession(MediaUploaderConfig.USERNAME(),MediaUploaderConfig.HOST(),MediaUploaderConfig.PORT());
        session.setPassword(password);

        session.setConfig("StrictHostKeyChecking","no");
        session.connect();

        Channel channel = session.openChannel("sftp");
        channel.connect();

        channelSftp = (ChannelSftp)channel;
    }

    public boolean isConnected () {
        return channelSftp.isConnected();
    }


    public void makeDirectory (String dir) throws SftpException {
        channelSftp.mkdir(dir);
    }



    public void shutdown() {
        channelSftp.disconnect();
        session.disconnect();
    }

    public void sendFile(InputStream inputStream, String s) throws SftpException {
        channelSftp.put(inputStream,s);
    }

    public void sendFile(String inputStream, String s) throws SftpException {
        channelSftp.put(inputStream,s);
    }

    public void rename (String in, String out ) throws SftpException {
        channelSftp.rename(in,out);
    }
}
