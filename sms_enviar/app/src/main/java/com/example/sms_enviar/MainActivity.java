package com.example.sms_enviar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    EditText numbertex,editmsg;
    Button enviarbutton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editmsg = findViewById(R.id.editTextTextPersonName2);
        numbertex = findViewById(R.id.Number);
        enviarbutton = findViewById(R.id.send);

        if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.SEND_SMS}, 1);
        }

        enviarbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v){
                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage(numbertex.getText().toString(),null,editmsg.getText().toString(),null,null);
            }
        });
    }
}