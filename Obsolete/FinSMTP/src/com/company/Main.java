package com.company;

import java.io.UnsupportedEncodingException;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class Main {

    public static void main(String[] args) throws UnsupportedEncodingException, MessagingException {
        String SMTP_HOST = "smtp.office365.com";
        String SMTP_USER = "5019TEST@csmb365.onmicrosoft.com";
        String SMTP_PASSWORD = "gs4atbRc";
        String SMTP_PORT = "587";

        final Properties props = new Properties();
        props.put("mail.smtp.host", SMTP_HOST);
        props.put("mail.smtp.port", SMTP_PORT);
        props.put("mail.transport.protocol","smtp");
        props.put("mail.smtp.auth", "true");
        //props.put("mail.ssl.enable", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.tls", "true");
        props.put("mail.smtp.ssl.checkserveridentity", "true");

        final javax.mail.Authenticator auth = new javax.mail.Authenticator() {
            @Override
            public javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new javax.mail.PasswordAuthentication(SMTP_USER, SMTP_PASSWORD);
            }
        };

        Session session = Session.getInstance(props, auth);
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("5019TEST@csmb365.onmicrosoft.com", "khfds"));

        //get student ID
        String StudentID = "1234567";
        String to = StudentID + "@chester.ac.uk";
        msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to, StudentID));
        msg.setSubject("Return Item Notice");
        msg.setText("Hello" + StudentID + "," + "" +
                "It is time to return your item you borrowed. Please return it to Paul Underhill in his office.");
        msg.saveChanges();
        Transport.send(msg);
    }
}
