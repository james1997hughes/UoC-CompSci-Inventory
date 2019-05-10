package timespongesoftware.dev.uocloaning

import android.content.Context
import android.hardware.Camera
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.SurfaceHolder
import android.view.SurfaceView
import kotlinx.android.synthetic.main.camprev_barcode.*

class BarcodeActivity : AppCompatActivity(), SurfaceHolder.Callback {
    lateinit var surfaceview: SurfaceView
    lateinit var surfaceholder: SurfaceHolder
    lateinit var backCamera: Camera
    lateinit var camParams: Camera.Parameters

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_barcode)
        setupSurface()
        backCamera = getCamera()
        setParameters()
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
            backCamera.setDisplayOrientation(90)
            backCamera.setPreviewDisplay(surfaceholder)
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

