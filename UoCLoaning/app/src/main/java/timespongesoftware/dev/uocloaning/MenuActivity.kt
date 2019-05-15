package timespongesoftware.dev.uocloaning

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log
import android.view.Menu
import android.view.MenuInflater
import android.widget.TextView

import kotlinx.android.synthetic.main.activity_menu.*
import timespongesoftware.dev.uocloaning.R.id.textView
import java.lang.Exception

class MenuActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_menu)
        setSupportActionBar(toolbar)

        fab.setOnClickListener { view ->
            var switchToScanner: Intent = Intent(
                this,
                BarcodeActivity::class.java
            )
            startActivity(switchToScanner)
        }

        var codePassed: String?
        try {
            var intent: Intent = intent
            codePassed = intent.getStringExtra("loanItem")
            findViewById<TextView>(R.id.textView).setText(codePassed)
            Log.d("Info", codePassed)
        } catch(e: Exception){
            Log.d("Info", "No item passed")
        }



    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        var inflater:MenuInflater = menuInflater
        inflater.inflate(R.menu.menu, menu)
        return super.onCreateOptionsMenu(menu)
    }
}
