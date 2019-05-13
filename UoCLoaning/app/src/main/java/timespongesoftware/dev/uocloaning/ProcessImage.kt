package timespongesoftware.dev.uocloaning

import android.content.Context
import android.content.res.Resources
import android.graphics.BitmapFactory
import android.net.Uri
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.Toast
//import android.view.Surface.ROTATION_0
import com.google.firebase.ml.vision.FirebaseVision
import com.google.firebase.ml.vision.barcode.*
import com.google.firebase.ml.vision.common.FirebaseVisionImage
import com.google.firebase.ml.vision.common.FirebaseVisionImageMetadata
import com.google.firebase.ml.vision.common.FirebaseVisionImageMetadata.ROTATION_0
import com.google.firebase.ml.vision.common.FirebaseVisionImageMetadata.ROTATION_90
import timespongesoftware.dev.uocloaning.R.drawable.workpls

class ProcessImage: AppCompatActivity(){

    lateinit var scannerMeta: FirebaseVisionImageMetadata
    private var successAchieved: Boolean = false

    fun hasBeenSuccessful(): Boolean{
        return successAchieved
    }
    fun barcodeFromCamera(data: ByteArray, cameraWidth: Int, cameraHeight: Int): String?{
        try {
            return detectBarcode(FirebaseVisionImage.fromByteArray(data, buildMetaData(cameraWidth, cameraHeight, 270)))
        } catch (E: Exception) {
            Log.d("error", "error with detectbarcode")
        }
        return ""
    }
    var initialized = false
    lateinit var options:FirebaseVisionBarcodeDetectorOptions
    lateinit var detector:FirebaseVisionBarcodeDetector
    fun initializeReader(){
        if (!initialized) {
            options = FirebaseVisionBarcodeDetectorOptions.Builder()
                .setBarcodeFormats(
                    FirebaseVisionBarcode.FORMAT_QR_CODE
                )
                .build()
            detector = FirebaseVision.getInstance().getVisionBarcodeDetector(options)
        }
    }
    var barcodeValue: String? = ""
    fun passBarcodeBack(): String?{
        return barcodeValue
    }
    fun detectBarcode(imagePassed: FirebaseVisionImage): String?{
        initializeReader()
        var result = detector.detectInImage(imagePassed)
            .addOnSuccessListener {
                barcode ->
                for (abarcode in barcode){
                    successAchieved = true
                    barcodeValue = abarcode.rawValue
                    Log.d("test", abarcode.rawValue)

                }
            }
            .addOnFailureListener {
                Log.d("error", "Failed to detect barcode in image")
            }
        return barcodeValue
    }

    fun buildMetaData(width: Int, height: Int, rotation: Int): FirebaseVisionImageMetadata{
        return FirebaseVisionImageMetadata.Builder()
            .setWidth(width)
            .setHeight(height)
            .setFormat(FirebaseVisionImageMetadata.IMAGE_FORMAT_NV21)
            .setRotation(ROTATION_90)
            .build()

    }
    fun determineRotation(): Int{

        return 360
    }

}