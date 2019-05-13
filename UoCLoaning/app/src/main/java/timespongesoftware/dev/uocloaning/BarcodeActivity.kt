package timespongesoftware.dev.uocloaning

import android.content.Context
import android.hardware.Camera
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.SurfaceHolder
import android.view.SurfaceView
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
    var frameDelay = 0
    var toasting = false
    override fun onPreviewFrame(data: ByteArray, camera: Camera?) {
        //Only run detection every 10 frames - 6 times per second on a 60fps camera
        //Saves a fuck ton of processing waste
        //Weirdly need to move camera around a bit for it to pass through properly - issue with this method of vision library???
        //In real world use case, probably not a problem, hand shake etc, still very fast at scanning it

            frameDelay++
        if (!toasting) {
            if (frameDelay == 1) {
                var barcode = imageProcesser.barcodeFromCamera(
                    data,
                    backCamera.parameters.previewSize.width,
                    backCamera.parameters.previewSize.height
                )
                if (imageProcesser.hasBeenSuccessful() && barcode!="" && barcode != null){
                    toasting = true
                    tellUser(imageProcesser.passBarcodeBack())

                }
            } else if (frameDelay == 10) {
                frameDelay = 0
            }
        }
    }
  fun tellUser(textToShow: String?){
        Log.d("test", textToShow)
        val toast = Toast.makeText(applicationContext, textToShow, Toast.LENGTH_SHORT)
        toast.show()
        toasting = false

    }



    fun setupSurface(){
        try {
            surfaceview = camPrevSV
            surfaceholder = surfaceview.holder
            surfaceholder.addCallback(this)
            surfaceholder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS)
        } catch(E: Exception){
        }
    }
    fun setParameters(){
        try {
            camParams = backCamera.parameters
            camParams.focusMode = Camera.Parameters.FOCUS_MODE_CONTINUOUS_PICTURE
            backCamera.parameters = camParams
        } catch (E: Exception){
            Log.d("error", "Error setting camera parameters")
        }
    }
    fun getCamera(): Camera {
            return Camera.open()
    }


    override fun surfaceChanged(holder: SurfaceHolder?, format: Int, width: Int, height: Int) {
        backCamera?.startPreview()
    }

    override fun onResume() {
        super.onResume()
        backCamera = getCamera()
    }

    override fun surfaceCreated(holder: SurfaceHolder?) {
        try{
            setParameters()
            backCamera.setDisplayOrientation(90)
            backCamera.setPreviewDisplay(surfaceholder)
            backCamera.setPreviewCallback(this)
            backCamera.startPreview()
        } catch(E: Exception){
            Log.d("error", "couldnt start preview")
        }
    }

    override fun surfaceDestroyed(holder: SurfaceHolder?) {
        try {
            backCamera.stopPreview()
            backCamera.release()
        } catch(E: Exception){
            Log.d("error", "couldn't release camera")
        }

    }


}

