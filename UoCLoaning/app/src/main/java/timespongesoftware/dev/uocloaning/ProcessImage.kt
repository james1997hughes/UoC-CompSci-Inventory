package timespongesoftware.dev.uocloaning

import android.support.v7.app.AppCompatActivity
import android.util.Log
import com.google.firebase.ml.vision.FirebaseVision
import com.google.firebase.ml.vision.barcode.*
import com.google.firebase.ml.vision.common.FirebaseVisionImage
import com.google.firebase.ml.vision.common.FirebaseVisionImageMetadata
import com.google.firebase.ml.vision.common.FirebaseVisionImageMetadata.ROTATION_90

class ProcessImage: AppCompatActivity(){

    //lateinit var scannerMeta: FirebaseVisionImageMetadata
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
    private var initialized = false
    lateinit var options:FirebaseVisionBarcodeDetectorOptions
    private lateinit var detector:FirebaseVisionBarcodeDetector
    private fun initializeReader(){
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
    private fun detectBarcode(imagePassed: FirebaseVisionImage): String?{
        initializeReader()
        detector.detectInImage(imagePassed)
            .addOnSuccessListener {
                barcode ->
                if (barcode.isNotEmpty()) {
                    for (abarcode in barcode) {
                        if (abarcode != null) {
                            successAchieved = true
                            barcodeValue = abarcode.rawValue
                        }
                    }
                }else{
                        successAchieved = false
                        barcodeValue = null
                }
            }
            .addOnFailureListener {
                successAchieved = false
                barcodeValue = null
                Log.d("error", "firebase detection error idk wtf this is")
            }
        return barcodeValue
    }

    private fun buildMetaData(width: Int, height: Int, rotation: Int): FirebaseVisionImageMetadata{
        return FirebaseVisionImageMetadata.Builder()
            .setWidth(width)
            .setHeight(height)
            .setFormat(FirebaseVisionImageMetadata.IMAGE_FORMAT_NV21)
            .setRotation(ROTATION_90)
            .build()
    }
    private fun determineRotation(): Int{
        //NEED TO CODE A ROTATION FUNCTION HERE
        //Detect what rotation the camera on the individual device is
        //Will be weird for some devices
        return 1
    }

}