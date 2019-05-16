package timespongesoftware.dev.uocloaning

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast

import kotlinx.android.synthetic.main.activity_menu.*
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
        var studIdPassed: String?
        try {
            var intent: Intent = intent
            codePassed = intent.getStringExtra("loanItem")
            studIdPassed = intent.getStringExtra("studID")
            findViewById<TextView>(R.id.loanTextView).setText(codePassed)
            findViewById<TextView>(R.id.idTextView).setText(studIdPassed)
            Log.d("Info", studIdPassed)
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
    override fun onOptionsItemSelected(item: MenuItem) = when (item.itemId) {
        R.id.logoutbtn -> {
            var switchToScanner: Intent = Intent(
                this,
                StudentCardActivity::class.java
            )
            startActivity(switchToScanner)
            true
        }
        else -> {
            super.onOptionsItemSelected(item)
        }
    }

    override fun onBackPressed() {
        val toast = Toast.makeText(applicationContext, "Please log out in the top right corner, or close the app", Toast.LENGTH_LONG)
        toast.show()
    }

}
