package timespongesoftware.dev.uocloaning

import android.app.AlertDialog
import android.content.DialogInterface
import android.content.Intent
import android.hardware.Camera
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.method.ScrollingMovementMethod
import android.util.Log
import android.view.SurfaceHolder
import android.view.SurfaceView
import android.widget.ImageView
import android.widget.Scroller
import android.widget.TextView
import android.widget.Toast
import kotlinx.android.synthetic.main.camprev_barcode.*

class BarcodeActivity : AppCompatActivity(), SurfaceHolder.Callback, Camera.PreviewCallback {
    private lateinit var surfaceview: SurfaceView
    private lateinit var surfaceholder: SurfaceHolder
    private lateinit var backCamera: Camera
    private lateinit var camParams: Camera.Parameters

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_barcode)
        setupSurface()
        backCamera = getCamera()
        setParameters()
    }

    private val imageProcesser = ProcessImage()
    private var frameDelay = 0
    private var barcode: String? = null
    override fun onPreviewFrame(data: ByteArray, camera: Camera?) {
        //CALLS EVERY PREVIEW FRAME
        //
        //Only run detection every 10 frames - 6 times per second on a 60fps camera
        //Saves a fuck ton of processing waste
        //Weirdly need to move camera around a bit for it to pass through properly - issue with this method of vision library???
        //In real world use case, probably not a problem, hand shake etc, still very fast at scanning it

            frameDelay++
            if (frameDelay == 1) {
                barcode = null
                barcode = imageProcesser.barcodeFromCamera(
                    data,
                    backCamera.parameters.previewSize.width,
                    backCamera.parameters.previewSize.height
                )
                if (imageProcesser.hasBeenSuccessful() && barcode!="" && barcode != null){
                    tellUser(imageProcesser.passBarcodeBack())
                }
            } else if (frameDelay == 10) {
                frameDelay = 0
            }
    }
    private var inDialog:Boolean = false
    private fun tellUser(textToShow: String?){
        if (!inDialog) {
            Log.d("test", textToShow)
            inDialog = true
            confirmDialog(textToShow)
        }

    }
    private fun confirmDialog(codeScanned: String?){

        var builder : AlertDialog.Builder = AlertDialog.Builder(this)
        builder.setTitle("Confirm Item")
        builder.setMessage("You have scanned item $codeScanned. Do you want to loan this item?")
        builder.setPositiveButton("Yes", DialogInterface.OnClickListener {
                dialog, id ->
            termsDialog(codeScanned)

            //Start t&c dialog

        })
        builder.setNegativeButton("No", DialogInterface.OnClickListener {
                dialog, id ->
            inDialog = false
            val toast = Toast.makeText(applicationContext, "CANCELLED", Toast.LENGTH_SHORT)
            toast.show()
        })
        var dialog:AlertDialog = builder.create()
        dialog.show()
    }

    private fun termsDialog(codeToSend: String?){
        var builder : AlertDialog.Builder = AlertDialog.Builder( this)
        builder.setTitle("Terms and Conditions")
        builder.setMessage(R.string.terms)
        builder.setPositiveButton("Agree", DialogInterface.OnClickListener{
            dialog, id ->
            inDialog = false
            var switchToMenu: Intent = Intent(
                this,
                MenuActivity::class.java
            )
            switchToMenu.putExtra("loanItem", codeToSend)
            startActivity(switchToMenu)

        })
        builder.setNegativeButton("Disagree", DialogInterface.OnClickListener { dialog, id ->
            inDialog = false
            val toast = Toast.makeText(applicationContext, "Didn't agree", Toast.LENGTH_SHORT)
            toast.show()
        })
        var dialog:AlertDialog = builder.create()
        dialog.show()
        var tandcs: TextView = dialog.findViewById(android.R.id.message)
        tandcs.setScroller(Scroller(this))
        tandcs.isVerticalScrollBarEnabled = true
        tandcs.movementMethod = ScrollingMovementMethod()

    }

    private fun setupSurface(){
        try {
            surfaceview = camPrevSV
            surfaceholder = surfaceview.holder
            surfaceholder.addCallback(this)
            surfaceholder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS)
        } catch(E: Exception){
        }
    }
    private fun setParameters(){
        try {
            camParams = backCamera.parameters
            camParams.focusMode = Camera.Parameters.FOCUS_MODE_CONTINUOUS_PICTURE
            backCamera.parameters = camParams
        } catch (E: Exception){
            Log.d("error", "Error setting camera parameters")
        }
    }
    private fun getCamera(): Camera {
            return Camera.open()
    }


    override fun surfaceChanged(holder: SurfaceHolder?, format: Int, width: Int, height: Int) {
        backCamera?.startPreview()
    }

    override fun onResume() {

        Thread {
            backCamera = getCamera()
        }
        backCamera.setPreviewCallback(null)
        setupSurface()
        setParameters()
        super.onResume()
    }

    override fun surfaceCreated(holder: SurfaceHolder?) {
        try{
            setParameters()
            backCamera.setDisplayOrientation(90)
            backCamera.setPreviewDisplay(surfaceholder)
            backCamera.setPreviewCallback(this)
            backCamera.startPreview()
            var imgParams = findViewById<ImageView>(R.id.imageView).layoutParams
            var camsurfaceparams = findViewById<SurfaceView>(R.id.camPrevSV).layoutParams
            imgParams.width = camsurfaceparams.width
            imgParams.height = camsurfaceparams.height
            findViewById<ImageView>(R.id.imageView).scaleType = ImageView.ScaleType.FIT_XY
            findViewById<ImageView>(R.id.imageView).layoutParams = imgParams

        } catch(E: Exception){
            Log.d("error", "couldnt start preview")
        }
    }

    override fun surfaceDestroyed(holder: SurfaceHolder?) {
        try {
            backCamera.setPreviewCallback(null)
            backCamera.stopPreview()
            backCamera.release()
        } catch(E: Exception){
            Log.d("error", "couldn't release camera")
        }

    }


}

