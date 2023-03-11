package com.example.gps_app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.location.LocationRequest;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.Socket;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.BreakIterator;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;


public class MainActivity<SimpleDateFormat1> extends AppCompatActivity {
    public EditText ip1, ip2, ip3;
    TextView tv_lat, tv_lon, tv_altitude, tv_accuracy, tv_speed, tv_speed1;
    public String portudp = "1234", porttcp = "51000";
    public Button send;
    public DatagramSocket dsock;
    public Socket sock;
    LocationRequest locationRequest;
    FusedLocationProviderClient fusedLocationProviderClient;
    Handler handler = new Handler();
    int delay = 10000;
    private FusedLocationProviderClient fusedLocationClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        if (ActivityCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{android.Manifest.permission.ACCESS_COARSE_LOCATION}, 1);
        }
        if (ActivityCompat.checkSelfPermission(MainActivity.this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }
        Calendar calendar = Calendar.getInstance();
        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");
        SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("HH:mm:ss");

        //se inicializan las variables
        ip1 = findViewById(R.id.IP1);
        ip2 = findViewById(R.id.IP2);
        ip3 = findViewById(R.id.IP3);
        send = findViewById(R.id.send);
        tv_lat = findViewById(R.id.tv_lat);
        tv_lon = findViewById(R.id.tv_lon);
        tv_altitude = findViewById(R.id.tv_altitude);
        tv_accuracy = findViewById(R.id.tv_accuracy);
        tv_speed = findViewById(R.id.tv_speed);
        tv_speed1 = findViewById(R.id.tv_speed1);
        ;
        fusedLocationClient.getLastLocation()
                .addOnSuccessListener(this, new OnSuccessListener<Location>() {
                    @Override
                    public void onSuccess(Location location) {
                        tv_lat.setText(String.valueOf(location.getLatitude()));
                        tv_altitude.setText(String.valueOf(location.getAltitude()));
                        tv_lon.setText(String.valueOf(location.getLongitude()));
                        tv_accuracy.setText(String.valueOf(location.getAccuracy()));
                        tv_speed.setText(String.valueOf(simpleDateFormat.format(location.getTime())));
                        tv_speed1.setText(String.valueOf(simpleDateFormat1.format(location.getTime())));
                    }
                });
        try {
            dsock = new DatagramSocket();
        } catch (SocketException e) {
            throw new RuntimeException(e);
        }
        sock = new Socket();
        //Se le da funcionalidad la boton de enviar con un evento
        //UDP sender
        handler.postDelayed(runnable, delay);


    }

    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            Calendar calendar = Calendar.getInstance();
            LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");
            SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("hh:mm:ss");
                tv_lat.setText(String.valueOf(location.getLatitude()));
                tv_altitude.setText(String.valueOf(location.getAltitude()));
                tv_lon.setText(String.valueOf(location.getLongitude()));
                tv_accuracy.setText(String.valueOf(location.getAccuracy()));
                tv_speed.setText(String.valueOf(simpleDateFormat.format(calendar.getTime())));
                tv_speed1.setText(String.valueOf(simpleDateFormat1.format(calendar.getTime())));
 //prueba

            SendData sender = new SendData();
            SendData sender2 = new SendData();
            SendData sender3 = new SendData();
            sender.execute(tv_lat.getText().toString()+" ; "+tv_lon.getText().toString()+" ; "+tv_speed.getText().toString()+" ; "+tv_speed1.getText().toString(),ip1.getText().toString(),portudp);
            sender2.execute(tv_lat.getText().toString()+" ; "+tv_lon.getText().toString()+" ; "+tv_speed.getText().toString()+" ; "+tv_speed1.getText().toString(),ip2.getText().toString(),portudp);
            sender3.execute(tv_lat.getText().toString()+" ; "+tv_lon.getText().toString()+" ; "+tv_speed.getText().toString()+" ; "+tv_speed1.getText().toString(),ip3.getText().toString(),portudp);
            handler.postDelayed(this, delay);
        }
    };
    private class SendData extends AsyncTask<String,String,String>{
        @Override
        protected String doInBackground(String... strings) {
            try{
                InetAddress address = InetAddress.getByName(strings[1]);
                byte [] data = strings[0].getBytes();
                int port = Integer.parseInt(strings[2]);
                DatagramPacket packet = new DatagramPacket(data,data.length,address,port);
                dsock.send(packet);
            }catch (UnknownHostException e){
                e.printStackTrace();
                // Handle the exception here. For example, you can show an error message to the user.
            } catch (IOException e){
                e.printStackTrace();
            }
            return null;
        }
    }

    }
